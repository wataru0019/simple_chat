<script lang="ts">
    import Header from '$lib/components/Header.svelte';

    let { data } = $props()
</script>

<div>
    <Header />
    <div class="chat-list-wrapper">
        <p>チャット履歴はありません</p>
    </div>
</div>

<style>
    .chat-list-wrapper {
        padding: var(--space-lg);
    }
</style>