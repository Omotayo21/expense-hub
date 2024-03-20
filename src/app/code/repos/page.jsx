import Link from "next/link";
async function fetchRepos() {
    const response = await fetch('https://api.github.com/users/omotayo21/repos')

    await new Promise(resolve => setTimeout(resolve, 3000))
    const repos = await response.json();
    return repos
}

const Repospage = async () => {
    const repos = await fetchRepos();
  return (
    <div><h2>Repositories</h2>
        <div>
            {repos.map((repo) => {
                return <div key={repo.id}>
                    <Link href={ `/code/repos/${repo.name}`}>
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                    <p>{repo.watchers_count}</p>
                    </Link>
                </div>
            })}
        </div>
    </div>
  )
}

export default Repospage