import {Response} from 'express';

import React from 'react';
import {jsx as _jsx} from "react/jsx-runtime";
import {renderToString} from 'react-dom/server';
import {getCachedTemplate} from "./cache_view.js";


/**
 * Render the React app on both the server and the client
 *
 * @returns string HTML render
 */
export const hybridRenderView = (res: Response, template: string, app: React.JSX.Element | React.ElementType<any, any>,
                           templateLocals: any, appLocals: Record<string, unknown>) => {


    if (templateLocals.bodyClass !== "static")  //If we are client rendering we have to hydrate
        templateLocals["bodyClass"] = "hydrate";

    templateLocals = {...res.locals, ...templateLocals};
    const html = getCachedTemplate(template)(templateLocals);

    const reactRender = renderToString(_jsx(app, { data: appLocals }));
    return html.replace("<main id=\"root\"></main>", `<main id="root">${reactRender}</main>`);
}

/**
 * Render the React app on the server
 *
 * @returns string HTML render
 */
export const serverRenderView = (res: Response, template: string, app: React.JSX.Element | React.ElementType<any, any>,
                                 templateLocals: any, appLocals: Record<string, unknown>) => {

    templateLocals["bodyClass"] = "static"; //Tell the client not to render
    return hybridRenderView(res, template, app, templateLocals, appLocals);
}

/**
 * Render the React app on the client
 *
 * @returns string HTML render
 */
export const clientRenderView = (res:Response, template: string, templateLocals: any) => {

    templateLocals = {...res.locals, ...templateLocals};
    return getCachedTemplate(template)(templateLocals);
};
