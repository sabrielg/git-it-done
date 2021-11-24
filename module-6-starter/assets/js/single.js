var repoNameEl = document.querySelector("#repo-name");
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(reponse) {
        if (reponse.ok) {
            reponse.json().then(function(data){
                displayIssues(data);

                if (reponse.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            console.log(response);
            alert("There was a problem with your request!");
        }
    });
    // for (let i = 0; i < issues.length; i++) {
    //     var issueEl = document.createElement("a");
    //     issueEl.classList = "list-item flex-row justify-space-between align-center";
    //     issueEl.setAttribute("href", issues[i].html_url);
    //     issueEl.setAttribute("target", "_blank");
        
    //     var titleEl = document.createElement("span");
    //     titleEl.textContent = issues[i].title;

    //     issueEl.appendChild(titleEl);

    //     var typeEl = document.createElement("span");

    //     if (issues[i].pull_request) {
    //         typeEl.textContent = "(Pull request)";
    //     } else {
    //         typeEl.textContent = "(Issue)"
    //     }
    //     issueEl.appendChild(typeEl)
    //     issueContainerEl.appendChild(issueEl);
    // }
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (let i = 0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        issueEl.appendChild(titleEl);

        var typeEl = document.createElement("span");

        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)"
        }
        issueEl.appendChild(typeEl)
        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit";

    var linkEl = document.createElement("a");
    linkEl.textContent = "GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");

    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");