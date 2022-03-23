async function getLaunch() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("launchId");
  const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  const data = await response.json();

  console.log(data);
  return data;
}

function setLaunch(launch) {
  const launchDiv = document.getElementById("launch");

  launchDiv.innerHTML += `
  <div class="col-10 mx-auto">
    <div class="card">
    <img src="${launch.links.patch.large}" class="card-img-top img-thumbnail img-fluid mx-auto" alt="Patch: ${launch.name}" style="max-width: 18rem;">
    <div class="card-body">
      <section>
        <h5 class="card-title">${launch.name}</h5>
        <p class="card-text">${launch.details}</p>
      </section>
      <hr />
      <section>
      <h2>Webcast</h2>
      <iframe width="100%" height="500" src="https://youtube.com/embed/${launch.links.youtube_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </section>
      <hr />
      <section>
        <h2>Other links</h2>
        <ul>
          <li><a href="${launch.links.article}" targer="_blank">Article</a></li>
          <li><a href="${launch.links.wikipedia}" targer="_blank">Wikipedia</a></li>
          <li><a href="${launch.links.reddit.launch}" targer="_blank">Reddit</a></li>
        </ul>
      </section>
    </div>
    </div>
  </div>
  `;
}

async function main() {
  const launch = await getLaunch();

  setLaunch(launch);
}

main();
