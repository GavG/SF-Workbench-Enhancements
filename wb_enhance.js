/**
 * @param {HTMLElement} select
 * @param {string} placeholder
 */
function selectToDatalist(select, placeholder, changeEvent = null) {
  var eSelect = select,
    options = eSelect.children,
    eInput = document.createElement("input"),
    eDatalist = document.createElement("datalist"),
    selected

  for (let option of options) {
    if (option.selected) {
      selected = option.value
    }

    eDatalist.appendChild(option.cloneNode())
  }

  eDatalist.id = "datalist-" + eSelect.name

  eInput.name = eSelect.name
  eInput.id = eSelect.id
  eInput.setAttribute("onChange", changeEvent)
  eInput.setAttribute("list", eDatalist.id)
  eInput.setAttribute("multiple", true)
  eInput.placeholder = placeholder || "Enter your " + eInput.name

  selected && (eInput.value = selected)

  eSelect.parentNode.append(eDatalist)
  eSelect.parentNode.replaceChild(eInput, eSelect)

  return eInput
}

function main() {
  console.log("Sf WBE Loaded")
  let selectInputElement = document.getElementById("QB_object_sel")

  if (selectInputElement) {
    selectToDatalist(selectInputElement, "Table", "updateObject()")
  }
}

window.addEventListener("load", main)
