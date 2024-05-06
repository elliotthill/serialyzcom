import pug from 'pug';

/**
 * High performance HashMap to retrieve Pug templates from memory
 * Express provides this by default, but as we are using our own
 * rendering, we have to do this ourselves.
 */
interface TemplateHashMap {
    [template: string] : pug.compileTemplate
}

let compiledTemplates:TemplateHashMap = {};


export const getCachedTemplate = (template: string) : pug.compileTemplate =>  {

    let pugRender: pug.compileTemplate;
    if (compiledTemplates[template] && process.env.NODE_ENV !== 'development') {
        return compiledTemplates[template];
    }
    else {
        pugRender = pug.compileFile("./client/views/"+template);
        compiledTemplates[template] = pugRender;
        return pugRender
    }

}
