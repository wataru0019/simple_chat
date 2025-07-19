<script lang="ts">
    let user = $state({user: "", name: ""})

    async function getUser() {
        const response = await fetch('/api/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json()
        console.log(data)
        return data
    }

    async function handleClick() {
        user = await getUser()
    }
</script>

<div class="user-view">
    <p>{ user }</p>
    <div>
        {#if user}
            {user?.email}
            {user?.name}
        {/if}
    </div>
    <button onclick={handleClick}>get</button>
</div>