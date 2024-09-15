 const url = "https://api.github.com/users";
        const searchinputel = document.getElementById("searchinput");
        const searchbutton = document.getElementById("buttonmain");
        const profilecontainerel = document.getElementById("profilecontainer");
        const loadingel = document.getElementById("loading");

        const generateProfile = (profile) => {
            return `
                <div id="cardbox" class="p-4 mb-4">
                    <div class="row">
                        <div class="col-12 col-md-8 card-header">
                            <div class="d-flex align-items-center">
                                <div class="avatar">
                                    <img alt="avatar" src="${profile.avatar_url}" />
                                </div>
                                <div class="profile-info ms-3">
                                    <h5 class="mb-0">${profile.name ? profile.name : 'No Name Provided'}</h5>
                                    <p class="text-muted mb-0">${profile.login}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 text-md-end text-center mt-3 mt-md-0">
                            <a href="${profile.html_url}" target="_blank">
                                <button id="buttoncard" class="btn btn-outline-danger">Check Profile</button>
                            </a>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <h2>About</h2>
                            <p>${profile.bio ? profile.bio : 'No bio available'}</p>
                        </div>
                    </div>
                    <div class="row justify-content-around mt-3">
                        <div class="col-12 col-md-3 text-center">
                            <h3>Followers</h3>
                            <p>${profile.followers}</p>
                        </div>
                        <div class="col-12 col-md-3 text-center">
                            <h3>Following</h3>
                            <p>${profile.following}</p>
                        </div>
                        <div class="col-12 col-md-3 text-center">
                            <h3>Repos</h3>
                            <p>${profile.public_repos}</p>
                        </div>
                    </div>
                </div>
            `;
        };

        const fetchProfile = async () => {
            const username = searchinputel.value;
            loadingel.innerText = "loading....";
            loadingel.style.color = "black";

            try {
                const res = await fetch(`${url}/${username}`);
                const data = await res.json();

                if (res.ok) {
                    loadingel.innerText = "";
                    profilecontainerel.innerHTML = generateProfile(data);
                } else {
                    loadingel.innerText = data.message || "User not found";
                    loadingel.style.color = "red";
                }
            } catch (error) {
                console.log({ error });
                loadingel.innerText = "An error occurred.";
                loadingel.style.color = "red";
            }
        };

        searchbutton.addEventListener("click", fetchProfile);