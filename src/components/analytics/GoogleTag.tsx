import Script from "next/script";

const GOOGLE_ANALYTICS_ID = "G-ED32Z2R4RM";
const GOOGLE_ADS_ID = "AW-18304303495";
const GOOGLE_ADS_PHONE_CONVERSION_ID =
    "AW-18304303495/Kvz3CKfQ9NocEIeDlphE";

export default function GoogleTag() {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-tag" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = window.gtag || gtag;
                    gtag('js', new Date());
                    gtag('config', '${GOOGLE_ANALYTICS_ID}');
                    gtag('config', '${GOOGLE_ADS_ID}');
                    gtag('config', '${GOOGLE_ADS_PHONE_CONVERSION_ID}', {
                        'phone_conversion_number': '(916) 521-1077'
                    });
                `}
            </Script>
        </>
    );
}
