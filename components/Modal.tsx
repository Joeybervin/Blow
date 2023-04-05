/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { createUserCookiesPreferences } from "@/helpers"
import { getCookie, hasCookie } from 'cookies-next';

export const Modal: React.FC = () => {

    interface CookiesParams {
        theme: boolean ;
        location: boolean ;
    }
    
    const [cookiesChoices, setCookiesChoices] = useState<CookiesParams>({ theme: hasCookie("savedTheme") ? Boolean(getCookie("savedTheme")) : false, location:  hasCookie("savedLocation") ? Boolean(getCookie("savedLocation")) : false });
    const [cookiesDoc, setCookiesDoc] = useState<string>("cookiesDocPart1");
    const [openCookiesPreferences, setOpenCookiesPreferences] = useState<boolean>(false);

    return (
        <>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full sm:w-11/12 sm:max-w-5xl p-4 overflow-hidden">

                    <div className="flex tabs border-t pt-4">
                        <a onClick={() => setCookiesDoc("cookiesDocPart1")} className={`flex-1 tab tab-bordered ${cookiesDoc === "cookiesDocPart1" ? "tab-active" : null} pb-10`}>Consentement</a>
                        <a onClick={() => setCookiesDoc("cookiesDocPart2")} className={`flex-1 tab tab-bordered ${cookiesDoc === "cookiesDocPart2" ? "tab-active" : null} pb-10`}>Détails</a>
                        <a onClick={() => setCookiesDoc("cookiesDocPart3")} className={`flex-auto tab tab-bordered ${cookiesDoc === "cookiesDocPart3" ? "tab-active" : null} pb-10`}>À propos des cookies</a>
                    </div>

                    <div className="max-h-64 sm:max-h-96 overflow-auto mt-5 pr-2">

                        <div className={`${cookiesDoc === "cookiesDocPart1" ? "block" : "hidden"}`}>
                            <p className="indent-8 text-md font-semibold py-2 mb-3">Ce site web utilise des cookies.</p>
                            <p className="">Les cookies nous permettent de personnaliser le contenu et les annonces, d'offrir des fonctionnalités relatives aux médias sociaux et d'analyser notre trafic. Nous partageons également des informations sur l'utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d'analyse, qui peuvent combiner celles-ci avec d'autres informations que vous leur avez fournies ou qu'ils ont collectées lors de votre utilisation de leurs services.</p>
                        </div>

                        <div className={`${cookiesDoc === "cookiesDocPart2" ? "block" : "hidden"} px-2.5`}>
                            <div className="mb-4 py-3">
                                <div className="flex justify-between">
                                    <div className="flex justify-around align-items-middle w-1/6">
                                        {/* chevron */}
                                        <label className="swap swap-rotate">
                                            <input type="checkbox" className="hidden" />
                                            <svg className="swap-on fill-current w-5 h-5" width="800" height="800" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 14a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L10 11.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 10 14z" fill="#000000"/></svg>
                                            <svg className="swap-off fill-current w-5 h-5" width="800" height="800" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 13a.997.997 0 0 1-.707-.293L10 8.414l-4.293 4.293a.999.999 0 1 1-1.414-1.414l5-5a.999.999 0 0 1 1.414 0l5 5A.999.999 0 0 1 15 13z" fill="#000000"/></svg>
                                        </label>
                                        <p className="font-bold">Nécessaire</p>
                                        <span className="badge">2</span>
                                    </div>
                                    {/* switch */}
                                    <label htmlFor="theme" className="cursor-pointer">
                                        <span className="relative">
                                            <div className="w-10 h-6 rounded-full shadow-inner bg-gray-400 "></div>
                                            <div className="absolute inset-y-0 right-0 w-4 h-4 m-1 rounded-full shadow bg-gray-800"></div>
                                        </span>
                                    </label>
                                </div>

                                <p className="pt-5">Les cookies nécessaires contribuent à rendre un site web utilisable en activant des fonctions de base comme la navigation de page et l'accès aux zones sécurisées du site web. Le site web ne peut pas fonctionner correctement sans ces cookies.</p>
                            </div>

                            <hr />

                            <div className="mt-4 py-3">

                                <div className="flex justify-between">
                                    <div className="flex justify-around align-items-middle w-1/6">
                                         {/* chevron */}
                                        <label className="swap swap-rotate">
                                            <input type="checkbox" className="hidden" checked={openCookiesPreferences} onChange={(e) => setOpenCookiesPreferences(e.target.checked)}/>
                                            <svg className="swap-on fill-current w-5 h-5" width="800" height="800" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 14a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L10 11.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 10 14z" fill="#000000"/></svg>
                                            <svg className="swap-off fill-current w-5 h-5" width="800" height="800" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 13a.997.997 0 0 1-.707-.293L10 8.414l-4.293 4.293a.999.999 0 1 1-1.414-1.414l5-5a.999.999 0 0 1 1.414 0l5 5A.999.999 0 0 1 15 13z" fill="#000000"/></svg>
                                        </label>
                                        <p className="font-bold">Préférences</p>
                                        <span className="badge">2</span>
                                    </div>
                                    {/* switch */}
                                    <label htmlFor="preferences" className="cursor-pointer">
                                        <span className="relative">
                                            <input id="preferences" type="checkbox" className="hidden peer"
                                            checked={cookiesChoices.theme && cookiesChoices.location ? true : false}
                                            onChange={(e) => setCookiesChoices({ location: e.target.checked ? true : false , theme: e.target.checked ? true : false })} />
                                            <div className="w-10 h-6 rounded-full shadow-inner bg-gray-400 peer-checked:bg-emerald-500"></div>
                                            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-800"></div>
                                        </span>
                                    </label>
                                </div>

                                <p className="pt-5">Les cookies de préférences permettent à un site web de retenir des informations qui modifient la manière dont le site se comporte ou s’affiche, comme votre langue préférée ou la région dans laquelle vous vous situez.</p>
                                
                                <div className={`${openCookiesPreferences ? "block" : "hidden"}`}>

                                    <div className="border rounded mx-6 mt-9 p-4">
                                        <div className="flex justify-between mb-3.5">
                                            <p className="font-semibold">Choix du thème : </p>
                                            {/* switch */}
                                            <label htmlFor="theme" className="cursor-pointer">
                                                <span className="relative">
                                                    <input id="theme" type="checkbox" className="hidden peer" checked={cookiesChoices.theme} onChange={() => setCookiesChoices({ ...cookiesChoices, theme: !cookiesChoices.theme })} />
                                                    <div className="w-10 h-6 rounded-full shadow-inner bg-gray-400 peer-checked:bg-emerald-500"></div>
                                                    <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-800"></div>
                                                </span>
                                            </label>
                                        </div>    
                                        <p>Enregistre votre choix sur le thème sélectionné lors de votre prochaine visite.</p>
                                    </div>

                                    <div className="border rounded mx-6 mt-5 p-4">
                                        <div className="flex justify-between mb-3.5">
                                            <p className="font-semibold">Géolocalisation : </p>
                                            {/* switch */}
                                            <label htmlFor="location" className="cursor-pointer">
                                                <span className="relative">
                                                    <input id="location" type="checkbox" className="hidden peer" checked={cookiesChoices.location} onChange={() => setCookiesChoices({ ...cookiesChoices, location: !cookiesChoices.location })} />
                                                    <div className="w-10 h-6 rounded-full shadow-inner bg-gray-400 peer-checked:bg-emerald-500"></div>
                                                    <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-800"></div>
                                                </span>
                                            </label>
                                        </div>
                                        <p>Enregistre votre localisation afin de vous offrir un service plus rapide lors de vos prochaines visites sur notre site. Vous pourrez à tous moments modifier votre choix.</p>
                                    </div>

                                </div>



                            </div>

                        </div>

                        <div className={`flex flex-col space-y-4 ${cookiesDoc === "cookiesDocPart3" ? "block" : "hidden"}`}>
                            <p>Les cookies sont des petits fichiers textes qui peuvent être utilisés par les sites web pour rendre l'expérience utilisateur plus efficace.</p>
                            <p>La loi stipule que nous ne pouvons stocker des cookies sur votre appareil que s’ils sont strictement nécessaires au fonctionnement de ce site. Pour tous les autres types de cookies, nous avons besoin de votre permission. Cela signifie que les cookies qui sont catégorisés comme nécessaires sont traités sur la base de l'art. 6 (1) lit. f du RGPD. Tous les autres cookies, c'est-à-dire ceux des catégories 'préférences' et 'marketing', sont traités sur la base de l'art. 6 (1) lit. a du RGPD.</p>
                            <p>Ce site utilise différents types de cookies. Certains cookies sont placés par les services tiers qui apparaissent sur nos pages.</p>
                            <p>À tout moment, vous pouvez modifier ou retirer votre consentement dès la Déclaration relative aux cookies sur notre site web.</p>
                            <p>En savoir plus sur qui nous sommes, comment vous pouvez nous contacter et comment nous traitons les données personnelles veuillez voir notre Politique confidentialité.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap modal-action mt-4">
                        <label onClick={() => createUserCookiesPreferences("allRejected")} htmlFor="my-modal-6" className="flex-auto sm:flex-initial btn btn-outline text-sm normal-case hover:btn-error my-1 ml-2">Tout refuser</label>
                        <label onClick={() => createUserCookiesPreferences("specific", cookiesChoices)} htmlFor="my-modal-6" className="flex-auto sm:flex-initial btn btn-outline text-sm normal-case h-fit hover:btn-success my-1">Autoriser la sélection</label>
                        <label onClick={() => createUserCookiesPreferences("allAccepted")} htmlFor="my-modal-6" className="flex-auto sm:flex-initial btn btn-success text-sm normal-case my-1">Tout autoriser</label>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Modal;

