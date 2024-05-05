import pug from 'pug';
import { jsx as _jsx } from "react/jsx-runtime";
import { renderToString } from 'react-dom/server';
import {Response} from 'express';
import React from 'react';

interface TemplateHashMap {
    [template: string] : pug.compileTemplate
}
let compiledTemplates:TemplateHashMap = {}; //Cache PUG templates
//Eliminates the time to load the template from disk (10ms+)

export const hybridRenderView = (res: Response, template: string, app: React.JSX.Element | React.ElementType<any, any>,
                           templateLocals: any, appLocals: Record<string, unknown>) => {

    if (templateLocals.bodyClass !== "static")
        templateLocals["bodyClass"] = "hydrate";
    templateLocals = {...res.locals, ...templateLocals};

    const html = getPug(template)(templateLocals);

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

    templateLocals = {...res.locals, ...templateLocals};

    const html = getPug(template)(templateLocals);

    return html;
};


const getPug = (template: string) : pug.compileTemplate =>  {

    let pugRender: pug.compileTemplate;
    if (compiledTemplates[template]) {
        return compiledTemplates[template];
    }
    else {
        pugRender = pug.compileFile("./client/views/"+template);
        compiledTemplates[template] = pugRender;
        return pugRender
    }

}
