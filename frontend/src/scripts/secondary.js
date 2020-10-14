const Session = require("../../../libcommon/libcommon.js").Session;

function get(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
        callback(xhr.status, xhr.response);
    };
    xhr.send();
}

function post(url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        callback(xhr.status, xhr.response);
    };
    xhr.send(data.to_json());
}

function set_id(string) {
    document.getElementById("name").value = string;

    if (string === current_id())
        return;

    window.history.pushState({ id: string }, `Session ${string}`, `/${string}`);
}

function current_id() {
    return window.location.pathname.slice(1);
}

function setup_id() {
    if (current_id() === "")
        set_id("1234");
    document.getElementById("name").value = current_id();
}

function load_callback(status, response) {
    if (status === 200) {
        let session = Session.from(response);
        set_id(session.name);
        document.getElementById("content").value = session.content;
    }
}

function load_button_click() {
    let url = "/api/sessions/" + current_id();
    get(url, load_callback);
}

function save_callback(status, response) {
    if (status === 200) {
        document.getElementById("content").value = "";
    }
}

function save_button_click() {
    let name = document.getElementById("name").value;
    set_id(name);
    let content = document.getElementById("content").value;
    let session = new Session(name, content);
    let url = "/api/sessions/" + current_id();
    post(url, session, save_callback);
}

function history_back(event) {
    set_id(event.state.id);
}

module.exports = {
    save_button_click,
    load_button_click,
    history_back,
    setup_id,
};
