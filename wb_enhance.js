/**
 * @param {HTMLElement} select
 * @param {string} placeholder
 */
function selectToDatalist(selectElementId, placeholder, changeEvent = null) {
    let select = document.getElementById(selectElementId)

    if (!select) {
        return;
    }

    var eSelect = select,
        options = eSelect.children,
        eInput = document.createElement("input"),
        eDatalist = document.createElement("datalist"),
        selected;

    for (let option of options) {
        if (option.selected) {
            selected = option.value;
        }

        eDatalist.appendChild(option.cloneNode());
    }

    eDatalist.id = "datalist-" + eSelect.name;

    eInput.name = eSelect.name;
    eInput.id = eSelect.id;
    eInput.setAttribute("onChange", changeEvent);
    eInput.setAttribute("list", eDatalist.id);
    eInput.setAttribute("multiple", true);
    eInput.placeholder = placeholder || "Enter your " + eInput.name;

    selected && (eInput.value = selected);

    eSelect.parentNode.append(eDatalist);
    eSelect.parentNode.replaceChild(eInput, eSelect);

    eInputClear = document.createElement("button");
    eInputClear.type = "button";
    eInputClear.innerText = "x";
    eInputClear.classList.add("btn-clear");
    eInputClear.setAttribute(
        "onClick",
        "document.getElementById('" + eInput.id + "').value=''"
    );
    insertAfter(eInputClear, eInput);

    return eInput;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function loginPage() {
    document.getElementById("termsAccepted").checked = true;
}

function queryPage() {
    selectToDatalist("QB_object_sel", "Table", "if(this.value){updateObject()}");
    selectToDatalist("QB_filter_field_0", "Filter By", "buildQuery()");
    selectToDatalist("QB_orderby_field", "Order By", "buildQuery()");
}

function main() {
    console.log("Sf WBE Loaded");

    switch (window.location.pathname) {
        case '/login.php':
            return loginPage()

        case '/query.php':
            return queryPage()
    }
}

window.addEventListener("load", main);
