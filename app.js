const { sendNotification } = require("./utils.js");
const term = require("terminal-kit").terminal;

const main = async (url, storeNumber = "", ntfy = "") => {
    return new Promise(async (resolve, reject) => {
        let response = await fetch(url, {
            method: "GET",
            credentials: "same-origin",
            headers: {
                cookie: "dssf=1; dssid2=f1dc6129-dac5-42c5-8607-979c955b15eb; geo=US; s_cc=true; at_check=true; pxro=2; dslang=US-EN; site=USA; as_cn=~GK0mmYtRpduzYhLpIDuCTqyA3vYAgFEVWOGkJW7uWGo=; rtsid=%7BUS%3D%7Bt%3Da%3Bi%3DR746%3B%7D%3B%7D; as_loc=f3c9d2dd9debd6024c85276df9da9848d95906b55abce5743004d06d9ae475415aa44823e3317d9244b95e1c45c47c9a99dac23d2b7f9255c3aeb78126e927e9d022ec324a2e913b880d2c297c35e6a1f4cf5229c3d441338fb279bd8b9bbdeb; as_uct=0; as_disa=AAAjAAAByaHIMPxN4Q8I_eLIaWxP8nEcX0cSETQl4DQRxUUow1wDhP1czCl2RrK1lwmUYvFVAAIBIpqlVBs0o6egvvyT9VWsmJDpiklC4yufHSBWZ12anmc=; as_rec=06b176df529f3283a2971d5aaa77d2f7ebea33f5f734ed524e650c68e0e293c4e7846fd2a048d209e44c61d6907f9305d78eae391c9485593ab3cf045bf678ece36f14490b708a143f815c92e3c04934; sso-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsIng1dCI6Im9TVlY2Q1pnclJ5cl9aMXVZRklRQWlYaWFXTEw2ZHRReHNSY2toQXVyQ0EifQ.eyJpc3MiOiJhb3MiLCJpYXQiOjE2OTQ4MzE5ODgxMzYsImF1ZCI6ImFvcyxhbXAsd3BjIiwiYWRzaWQiOiIwMDEwNjQtMDgtMGEwNmNkODAtM2M5Ny00OGQwLTk1MDMtMzg3MDg0ZDE3ZTliIn0.AzF3PmSXcjg1wrbqycoNgIY2dpb-rOnfne2R-uP1XXHaSVRALf-SbI67rVjxtdV0Ss48RAu0MM_wMf85Qdgz-A; as_ltn_us=AAQEAMGnVFVbwneH2Lm4wks4mlRfnAD3aM2byGgekD4JUEbp9Pd6qxJ3-vVO54NxLUv4KChQ9zkdvQph6avf8Phs1T7-4pAkeIA; s_fid=560D43EF62707AC3-1A6A9B46ADBC9EA1; as_dc=ucp4; s_vi=[CS]v1|32873090E66C976B-4000095B00C087EA[CE]; as_pcts=iP8bNdsKEIPeXy9-xnaNra2ovCasztMpSACUoT7pcin+_0FzEnE3czW1D:9qsYgA5KWhcDNPdO-1cPt0MTZ72C8ALmR4mg5WdvuGl-q2d6Aiyv0ZbVqCzT3I4UuxuHD9n0PspKTJNlDlZEEY47a3wUTEPO:ate1WKYmztQSojkg7VB_dKhfbYyxsbWHN_G3bb_ji--TSd0YmUy1xAx4L:hGhV1Z43q4lAPY1xKfB9PiLhjV:YD_w3u; as_sfa=Mnx1c3x1c3x8ZW5fVVN8Y29uc3VtZXJ8aW50ZXJuZXR8MHwwfDE; as_atb=1.0|MjAyMy0wOS0yMiAwOToyNjo0Nw|aa203d7945782a7ea3f07a1c181f5c2a779e36c2; s_sq=%5B%5BB%5D%5D; pt-dm=v1~x~vz1r0b0n~m~1~n~404%20-%20page%20not%20found%20(us)~a~appleCard::web apply | denied | pre:not safari^appleCard::denied | pre:not safari; mk_epub=%7B%22btuid%22%3A%2212adrq1%22%2C%22events%22%3A%22event220%3D0.006%2Cevent221%3D0.000%2Cevent222%3D0.000%2Cevent223%3D0.000%2Cevent224%3D0.821%2Cevent225%3D0.005%2Cevent226%3D0.069%2Cevent227%3D0.001%2Cevent228%3D0.061%2Cevent229%3D0.132%2C%22%2C%22prop57%22%3A%22www.us.errorpage%22%7D"
            }
        });
        if (response.status === 200) {
            const searchParams = new URLSearchParams(url);
            const partNumber = searchParams.get("parts.0");
            response = await response.json();
            response = response.body.content.pickupMessage
            let store = null;
            if (storeNumber) {
                for (let i = 0; i < response.stores.length; i++) {
                    if (response.stores[i].storeNumber === storeNumber) {
                        store = response.stores[i];
                        break;
                    }
                }
            } else {
                store = response.stores[0];
            }

            if (store) {
                const item = store.partsAvailability[partNumber];
                if (item && item.pickupDisplay !== "unavailable") {
                    const productName = item.messageTypes.regular.storePickupProductTitle;
                    term.green(`${productName} is available now at ${store.storeName}\n`);
                    await sendNotification(ntfy, `${productName} is available now at ${store.storeName}`);
                } else {
                    term.yellow(`${partNumber} is not available!\n`);
                }
                resolve();
            }
        } else {
            term.red("Unable to get details!");
            reject()
        }
    });
};

module.exports = {
    main
}