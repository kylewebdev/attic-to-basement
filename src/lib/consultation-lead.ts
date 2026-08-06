export const SITUATIONS = [
    "settling",
    "downsizing",
    "cleanout",
    "appraisal",
    "buying",
    "other",
] as const;

export const CONTACT_METHODS = ["phone", "email"] as const;

export type ConsultationLead = {
    submissionId: string;
    name: string;
    phone: string | null;
    email: string;
    propertyAddress: string | null;
    cityZip: string | null;
    situation: (typeof SITUATIONS)[number] | null;
    preferredContact: (typeof CONTACT_METHODS)[number];
    details: string;
};

type ParseResult =
    | { ok: true; lead: ConsultationLead }
    | { ok: false; error: string };

const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formString(data: FormData, name: string) {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
}

function singleLine(value: string) {
    return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

function multiLine(value: string) {
    return value
        .replace(/\r\n?/g, "\n")
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
        .trim();
}

function optional(value: string, maximum: number) {
    const normalized = singleLine(value);
    if (!normalized) return null;
    return normalized.length <= maximum ? normalized : undefined;
}

export function parseConsultationForm(data: FormData): ParseResult {
    const submissionId = singleLine(formString(data, "submission_id"));
    const name = singleLine(formString(data, "name"));
    const email = singleLine(formString(data, "email")).toLowerCase();
    const details = multiLine(formString(data, "description"));
    const phone = optional(formString(data, "phone"), 40);
    const propertyAddress = optional(formString(data, "property_address"), 300);
    const cityZip = optional(formString(data, "city"), 160);
    const situationValue = singleLine(formString(data, "situation"));
    const contactValue = singleLine(formString(data, "contact_method"));

    if (!UUID_PATTERN.test(submissionId)) {
        return { ok: false, error: "Invalid submission ID." };
    }
    if (!name || name.length > 120) {
        return { ok: false, error: "Name is required." };
    }
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
        return { ok: false, error: "A valid email is required." };
    }
    if (!details || details.length > 5000) {
        return { ok: false, error: "Details are required." };
    }
    if (phone === undefined || propertyAddress === undefined || cityZip === undefined) {
        return { ok: false, error: "One or more fields are too long." };
    }
    if (situationValue && !SITUATIONS.some((value) => value === situationValue)) {
        return { ok: false, error: "Invalid situation." };
    }
    if (!CONTACT_METHODS.some((value) => value === contactValue)) {
        return { ok: false, error: "Invalid preferred contact method." };
    }

    return {
        ok: true,
        lead: {
            submissionId,
            name,
            phone,
            email,
            propertyAddress,
            cityZip,
            situation: situationValue
                ? (situationValue as ConsultationLead["situation"])
                : null,
            preferredContact: contactValue as ConsultationLead["preferredContact"],
            details,
        },
    };
}

export function isHoneypotFilled(data: FormData) {
    return singleLine(formString(data, "_gotcha")).length > 0;
}

export function formspreePayload(lead: ConsultationLead) {
    const data = new FormData();
    data.set("submission_id", lead.submissionId);
    data.set("name", lead.name);
    data.set("phone", lead.phone ?? "");
    data.set("email", lead.email);
    data.set("property_address", lead.propertyAddress ?? "");
    data.set("city", lead.cityZip ?? "");
    data.set("situation", lead.situation ?? "");
    data.set("description", lead.details);
    data.set("contact_method", lead.preferredContact);
    data.set("_gotcha", "");
    return data;
}
