/*This code is inspired from previous classes with Monde Sineke,
and taken from the js-project*/

//FUNCTION - CREATE HTML ELEMENT FROM A STRING TEMPLATE
export function createHTML(template){
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(template, "text/html");
    return parsedDocument.body.firstChild;
}


// FUNCTION - CLEAR CONTAINER
export function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}