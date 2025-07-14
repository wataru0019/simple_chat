<script lang="ts">
    import type { Message } from "$lib/types"
    import { onMount } from "svelte";
    let messages: Message[] = $state([])
    let new_message: string = $state("");
    onMount(() => {

    })
    function handleSubmit(e: Event) {
        e.preventDefault()
        messages.push({role: "human", content: new_message})
        console.log(new_message)
        new_message = ""
    }
</script>

<main>
    <div class="chat-container">
        {#if messages.length === 0}
        <div class="pre-chat">
            <h2>こんにちは！<br>今日はどのようなお手伝いをしましょうか。</h2>
        </div>
        <div class="chat-box">
            <form class="chat-form" onsubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Type your message here..."
                    bind:value={new_message}
                    />
                <button type="submit">Send</button>
            </form>
        </div>
        {:else}
        <div class="chat-view">
            {#each messages as message}
                <div class={message.role}>
                    {message.content}
                </div>
            {/each}
        </div>
        <div class="chat-box">
            <form class="chat-form" onsubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Type your message here..." 
                    bind:value={new_message}
                    />
                <button type="submit">Send</button>
            </form>
        </div>
        {/if}
    </div>
</main>

<style>
    .chat-container {
        display: flex;
        flex-direction: column;
        justify-content: center; /* 縦方向中央 */
        align-items: center;     /* 横方向中央 */
        height: 100vh;
    }

    .pre-chat {
        padding: var(--space-xl)
    }

    .pre-chat h2 {
        font-size: var(--font-size-base);
        text-align: center;
    }

    .chat-box {
        width: 100%;
        padding: var(--space-xl);
    }

    .chat-form {
        display: flex;
        flex-direction: row;
        gap: var(--space-sm); /* 要素間のスペース（任意） */
        justify-content: center; /* 横方向中央 */
    }

    .chat-box input {
        width: 70%;
        padding: var(--space-sm);
        font-size: var(--font-size-base);
    }
</style>