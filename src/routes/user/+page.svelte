<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import { user } from "$lib/stores"
    let editable = $state(false)

    async function toggleEdit() {
        editable = !editable
    }
</script>

<div>
    <Header />
    <div class="user-view-wrapper">
        <div class="user-view">
            <div class="user-avator">
            {#if $user?.avator}
                <img src={$user?.avator} alt="user's avator" />
            {/if}
                <div class="non-avator"></div>
            </div>
            <div class="user-info">
                {#if editable}
                    <form>
                        <div class="form-control">
                            <label for="name">お名前：</label>
                            <input type="text" name="name" placeholder="お名前を入力してください。" />
                        </div>
                        <div class="form-control">
                            <label for="email">メール：</label>
                            <input type="mail" name="email" placeholder="メールを入力してください。" />
                        </div>
                    </form>
                {:else}
                    <ul>
                        <li>お名前：{ $user?.name }</li>
                        <li>メール：{ $user?.email }</li>
                    </ul>
                {/if}
            </div>
            <div class="edit-toggle">
                {#if editable}
                    <button onclick={toggleEdit} class="btn destroy">破棄する</button>
                    <button onclick={toggleEdit} class="btn primary">保存する</button>
                {:else}
                    <button onclick={toggleEdit} class="btn primary">編集する</button>
                {/if}

            </div>
        </div>
    </div>
</div>

<style>
    .user-view-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .user-view {
        padding: var(--space-lg)
    }

    .user-avator {
        display: flex;
        justify-content: center;
    }

    .non-avator {
        height: 60px;
        width: 60px;
        margin: var(--space-md);
        border-radius: 50%;
        background-color: var(--light-accent-color);
    }

    .user-info {
        padding: var(--space-md);
    }

    .form-control {
        padding: var(--space-sm) 0;
    }

    .form-control input {
        width: 100%;
        margin-top: var(--space-sm);
        padding: var(--space-md);
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: var(--space-sm);
    }

    .edit-toggle {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .edit-toggle .btn {
        padding: var(--space-sm);
        border: none;
        border-radius: var(--space-sm);
    }

    .edit-toggle .destroy {
        margin-right: var(--space-sm);
        color: var(--light-shade);
        background-color: var(--dark-accent-color);
    }

    .edit-toggle .primary {
        color: var(--light-shade);
        background-color: var(--primary-color);
    }
</style>