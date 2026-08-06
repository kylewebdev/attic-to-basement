import { NextRequest, NextResponse } from "next/server";
import {
    formspreePayload,
    isHoneypotFilled,
    parseConsultationForm,
} from "@/lib/consultation-lead";

export const runtime = "nodejs";
export const maxDuration = 30;

function configured(name: string) {
    return process.env[name]?.trim() ?? "";
}

export async function POST(request: NextRequest) {
    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > 64_000) {
        return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
    }

    const data = await request.formData().catch(() => null);
    if (!data) {
        return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
    }

    // Give spambots a normal-looking response without notifying staff or
    // creating a Basecamp card.
    if (isHoneypotFilled(data)) {
        return NextResponse.json({ accepted: true });
    }

    const parsed = parseConsultationForm(data);
    if (!parsed.ok) {
        return NextResponse.json({ error: parsed.error }, { status: 422 });
    }

    const formspreeId = configured("NEXT_PUBLIC_FORMSPREE_ID");
    const intakeUrl = configured("ABEL_LOG_INTAKE_URL");
    const intakeToken = configured("ABEL_LOG_INTAKE_TOKEN");
    if (!formspreeId || !intakeUrl || !intakeToken) {
        console.error("Consultation intake is missing required server configuration");
        return NextResponse.json(
            { error: "Consultation submissions are temporarily unavailable." },
            { status: 503 },
        );
    }

    try {
        const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: "POST",
            body: formspreePayload(parsed.lead),
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(10_000),
        });
        if (!formspreeResponse.ok) {
            console.error("Formspree consultation submission failed", {
                status: formspreeResponse.status,
                submissionId: parsed.lead.submissionId,
            });
            return NextResponse.json(
                { error: "Could not send the consultation request." },
                { status: 502 },
            );
        }

        const intakeResponse = await fetch(intakeUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${intakeToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                submissionId: parsed.lead.submissionId,
                name: parsed.lead.name,
                phone: parsed.lead.phone,
                email: parsed.lead.email,
                propertyAddress: parsed.lead.propertyAddress,
                city: parsed.lead.cityZip,
                situation: parsed.lead.situation,
                contactMethod: parsed.lead.preferredContact,
                description: parsed.lead.details,
            }),
            cache: "no-store",
            signal: AbortSignal.timeout(15_000),
        });
        const intakeResult = (await intakeResponse.json().catch(() => null)) as {
            accepted?: unknown;
            cardId?: unknown;
        } | null;
        if (
            !intakeResponse.ok ||
            intakeResult?.accepted !== true ||
            (typeof intakeResult.cardId !== "string" &&
                typeof intakeResult.cardId !== "number")
        ) {
            console.error("Abel Log consultation intake failed", {
                status: intakeResponse.status,
                submissionId: parsed.lead.submissionId,
            });
            return NextResponse.json(
                { error: "Could not finish the consultation request." },
                { status: 502 },
            );
        }

        return NextResponse.json({ accepted: true });
    } catch (error) {
        console.error("Consultation submission failed", {
            submissionId: parsed.lead.submissionId,
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json(
            { error: "Could not send the consultation request." },
            { status: 502 },
        );
    }
}
