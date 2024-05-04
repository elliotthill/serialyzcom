import pug from 'pug';
import { jsx as _jsx } from "react/jsx-runtime";
import { renderToString } from 'react-dom/server';
import {Response} from 'express';
import React from 'react';

export const hybridRenderView = (res: Response, template: string, app: React.JSX.Element | React.ElementType<any, any>,
                           templateLocals: any, appLocals: Record<string, unknown>) => {

    templateLocals = {...templateLocals, ...res.locals};
    const pugRender = pug.compileFile("./client/views/"+template);
    const html = pugRender(templateLocals);

    const reactRender = renderToString(_jsx(app, { data: appLocals }));
    const htmlRender = html.replace("<main id=\"root\"></main>", `<main id="root">${reactRender}</main>`);
    return htmlRender;
}

export const serverRenderView = (res: Response, template: string, app: React.JSX.Element | React.ElementType<any, any>,
                                 templateLocals: any, appLocals: Record<string, unknown>) => {

    templateLocals["bodyClass"] = "static"; //Tell the client not to render
    return hybridRenderView(res, template, app, templateLocals, appLocals);
}

export const clientRenderView = (res:Response, template: string, templateLocals: any) => {

    templateLocals = {...templateLocals, ...res.locals};
    const pugRender = pug.compileFile("./client/views/"+template);
    const html = pugRender(templateLocals);

    return html;
};
