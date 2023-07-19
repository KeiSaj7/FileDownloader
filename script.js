const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault(); // prevent form from submitting
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url){
    // fetch file and return response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; // passing tempUrl as href value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/,""); // passing file last name and extension as donwload value of <a> tag
        document.body.appendChild(aTag); // adding <a> tag inside body
        aTag.click(); // clicking <a> tag so the file download
        aTag.remove(); // removing <a> tag once file donwloaded
        URL.revokeObjectURL(tempUrl) // removing tempUrl from document
        downloadBtn.innerText = "Download file";
    }).catch(() => {
        // if error occurs
        downloadBtn.innerText = "Download file";
        alert("Failed to download file!");
    })
}

