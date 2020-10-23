// Handler for the import button
function importHandler(instance, resolve) {
  return () => {
    const files = document.getElementById("database-loader").files;
    if (files.length <= 0) {
      alert("No file loaded");
      instance.open();
      return;
    }

    const fr = new FileReader();

    fr.onload = function (e) {
      try {
        const result = JSON.parse(e.target.result);
        resolve(result);
      } catch (e) {
        alert("Error loading database");
        instance.open();
        return;
      }
    };

    fr.readAsText(files.item(0));
  };
}

function downloadButton() {
  return () => {
    const database = JSON.parse(localStorage.getItem("database"));
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(database));
    const dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "database.json");
    dlAnchorElem.click();
  };
}

function insertClick(listDynamic) {
  for (let i = 0; i < listDynamic.length; i++) {
    triadaDinamica = listDynamic[i];
    const triada = document.getElementById(triadaDinamica.id);
    triada.onclick = () => {
      const modal = document.getElementById("modal2");
      const title = document.getElementById("modal-title");
      const paragraph = document.getElementById("modal-paragraph");
      const modalForm = document.getElementById("modal-form");
      const buttonForm = document.getElementById("modal-button");
      title.innerHTML = triadaDinamica.title;
      paragraph.innerHTML = triadaDinamica.paragraph;
      modalForm.innerHTML = "";

      for (let j = 0; j < triadaDinamica.fields.length; j++) {
        const field = triadaDinamica.fields[j];

        // Create a <div> node
        const div = document.createElement("div");
        div.className = "input-field col s6";

        // <input placeholder="Placeholder" id="first_name" type="text" class="validate">
        const input = document.createElement("input");
        input.id = field.id;
        input.type = "text";
        input.class = "validate";

        // <label for="first_name">First Name</label>
        const label = document.createElement("label");
        label.for = field.id;
        label.innerHTML = field.label;

        div.appendChild(input);
        div.appendChild(label);

        modalForm.appendChild(div);
      }

      buttonForm.onclick = () => {
        const inputs = document.querySelectorAll("#modal-form>div>input");
        const database = JSON.parse(localStorage.getItem("database"));
        console.log(inputs);
        for (let k = 0, len = inputs.length; k < len; k++) {
          const userInput = inputs[k].value;
          database[`data_entered${k}`] = userInput;
        }
        localStorage.setItem("database", JSON.stringify(database));
      };

      const instance = M.Modal.getInstance(modal);
      instance.open();
    };
  }
}

function main() {
  M.AutoInit();
  // Opens the modal window
  const elems = document.querySelectorAll("#modal1");
  const instance = M.Modal.getInstance(elems[0]);
  instance.open();

  let resolve;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });

  document.getElementById("importBtn").onclick = importHandler(
    instance,
    resolve
  );

  promise.then((loadedDatabase) => {
    localStorage.setItem("database", JSON.stringify(loadedDatabase));
  });

  document.getElementById("tooltipDownload").onclick = downloadButton();

  const epIds = [
    {
      id: "teacher_asigns_quiz",
      title: "Teacher assigns quiz",
      paragraph: "teacher assigns a quiz",
      fields: [{ id: "quiz", label: "Quiz" }],
    },
    {
      id: "program_manager_registers",
      title: "Program manager registers",
      paragraph: "program manager register",
      fields: [
        { id: "manager", label: "Manager" },
        { id: "manager2", label: "Manager2" },
      ],
    },
  ];

  insertClick(epIds);
}

document.addEventListener("DOMContentLoaded", main);
