/** Allows for custom templates to be used on the front-end
 *
 * @param string - raw template string
 * @param options - open and closing delimiter for rendering
 * // TODO: add check for custom delimiters!
 *
 */
function template (string, options = {open: '*(', close: ')*'}) {
    // add empty space after
    const openDelimLen = options.open.length + 1,
        closeDelimLen = options.close.length + 1,
        parts = [],
        vars = [];
    let functionBody, functionString, distinctVars;
    
    while(string.indexOf(options.open) > 0) {
        let openIndex = string.indexOf(options.open),
            // subtract empty space beforehand
            closeIndex = string.indexOf(options.close) - 1,
            variable;
            
        variable = string.substring(openIndex + openDelimLen, closeIndex);
        vars.push(variable);
        
        parts.push('"' + string.substring(0, openIndex) + '" + ');
        parts.push(variable + ' + ');
        string = string.slice(closeIndex + closeDelimLen);
    }
    parts.push('"' + string + '"');
    
    functionString = parts.join('');
    distinctVars = Array.from(new Set(vars));
    
    return Function(distinctVars.join(','), 'num', '' +
    'let str = "";' +
    'for (let i = 0; i < num; i++) {' +
    '   console.log(' + functionString +');' +
    '};' +
    '')
}

const str = 'My name is *( name )*, I *( feeling )* to *( action )*\.';
const logResult = template(str);
logResult('Zoe','love','code', 3);