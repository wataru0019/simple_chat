<script lang="ts">
    import type { Message } from "$lib/types"
    import { onMount } from "svelte";
    let messages: Message[] = $state([])
    let new_message: string = $state("");
    onMount(() => {
        // messages = [
        //     { role: "user", content: "hi!"},
        //     { role: "assistant", content: "hi! wataru!" }
        // ]
    })
    function handleSubmit(e: Event) {
        e.preventDefault()
        messages.push({role: "user", content: new_message})
        console.log(new_message)
        new_message = ""
    }
</script>

<main>
    {#if messages.length === 0}
        <div class="chat-container">
            <div class="pre-chat">
                <h2>こんにちは！<br>今日はどのようなお手伝いをしましょうか。</h2>
            </div>
            <div class="chat-box">
                <form class="chat-form" onsubmit={handleSubmit}>
                    <textarea 
                        placeholder="Type your message here..."
                        bind:value={new_message}
                        ></textarea>
                    <button type="submit">Send</button>
                </form>
                <div class="tool-box">
                    tools
                </div>
            </div>
        </div>
    {:else}
        <div class="chat-container-view">
            <div class="chat-view-wrapper">
                <div class="chat-view">
                    {#each messages as message}
                        <div class="{message.role} message">
                            <p>{message.content}</p>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="chat-box-bottom">
                <form class="chat-form" onsubmit={handleSubmit}>
                    <textarea
                        placeholder="Type your message here..." 
                        bind:value={new_message}
                    ></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    {/if}
</main>

<style>
    .chat-container {
        display: flex;
        flex-direction: column;
        justify-content: center; /* 縦方向中央 */
        align-items: center;     /* 横方向中央 */
        height: 100vh;
    }

    .chat-container-view {
        display: flex;
        flex-direction: column;
        justify-content: start; /* 縦方向中央 */
        align-items: center;    /* 横方向中央 */
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

    .chat-box-bottom {
        width: 100%;
        padding: var(--space-xl);

        position: fixed;
        bottom: -5px;
    }

    .chat-form {
        display: flex;
        flex-direction: row;
        gap: var(--space-sm); /* 要素間のスペース（任意） */
        justify-content: center; /* 横方向中央 */
    }

    .chat-box textarea {
        width: 70%;
        padding: var(--space-sm);
        font-size: var(--font-size-base);
        border-color: var(--primary-color);
        border-radius: var(--space-sm);
        border-width: 0.5px;
    }

    .chat-box-bottom textarea {
        width: 70%;
        padding: var(--space-sm);
        font-size: var(--font-size-base);
        border-color: var(--primary-color);
        border-radius: var(--space-sm);
        border-width: 0.5px;
    }

    .chat-view-wrapper {
        width: 100%;
    }

    .chat-view {
        padding: var(--space-xl)
    }

    .chat-view .message {
        color: red;
    }

    .chat-view .user {
        color: var(--light-shade);
        background-color: var(--primary-color);
        border-radius: var(--space-sm);
    }

    .chat-view .user p {
        padding: var(--space-sm);
        margin: var(--space-sm);
    }

    .chat-view .assistant {
        color: var(--primary-color);
        background-color: var(--light-shade);
        border-radius: var(--space-sm);
    }

    .chat-view .assistant p {
        padding: var(--space-sm);
        margin: var(--space-sm);
    }

    button {
        color: var(--light-shade);
        background-color: var(--primary-color);
        border: none;
        border-radius: var(--space-sm);
    }
</style>