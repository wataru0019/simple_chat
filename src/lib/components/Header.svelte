<script lang="ts">
    import { signOut } from "@auth/sveltekit/client"
    import { logo } from "$lib/stores"

    console.log(logo)

    async function handleLogout(e: Event) {
        e.preventDefault()
        signOut()
    }
</script>

<header>
    <div class="header-logo">
        <h2 class="logo">
            {$logo}
        </h2>
    </div>
    <div class="header-menu">
        <div class="header-buttons">
            <button onclick={handleLogout}>ログアウト</button>
        </div>
    </div>
</header>

<style>
    header {
        max-height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .header-logo {
        padding: var(--space-md);
        font-size: var(--font-size-lg);
    }

    .header-menu {
        padding: var(--space-md);
    }

    .header-buttons button {
        padding: var(--space-sm);
        border: 1px solid var(--primary-color);
        border-radius: var(--space-sm);
        background-color: var(--light-shade);
    }
</style>