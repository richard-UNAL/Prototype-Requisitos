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

function downloadButton(database) {
  return () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(database));
    const dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "database.json");
    dlAnchorElem.click();
  };
}

function main() {
  M.AutoInit();
  // Opens the modal window
  const elems = document.querySelectorAll(".modal");
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

  document.getElementById("tooltipDownload").onclick = downloadButton(
    JSON.parse(localStorage.getItem("database"))
  );
}

document.addEventListener("DOMContentLoaded", main);
