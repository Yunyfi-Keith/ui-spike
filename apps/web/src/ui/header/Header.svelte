<script lang="ts">
    import {appStore, SurfaceDisplayMode} from '../../stores/app-store';
    import {userProfileStore} from '../../stores/user-profile-store';
</script>

<style>
    .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: #ffffff;
        border-bottom: 1px solid #e4e6ef;
    }

    .title {
        font-weight: 600;
        font-size: 1rem;
    }

    .spacer {
        margin-left: auto;
    }

    .actions {
        display: flex;
        gap: 8px;
    }

    button {
        padding: 6px 10px;
        border: 1px solid #d8dbe6;
        border-radius: 6px;
        background: #f7f8fc;
        cursor: pointer;
    }

    button:hover {
        background: #eef1f8;
    }

    button.wide {
        width: 180px;
    }

</style>

<div class="header">
    <div class="title">Page Header</div>
    <div class="spacer"></div>
    <div class="actions">
        {#each [SurfaceDisplayMode.Operation, SurfaceDisplayMode.Design, SurfaceDisplayMode.Preview] as mode}
            <button
                    on:click={() => appStore.dispatch({eventAction: 'set-display-mode', detail: { mode }})}
                    disabled={$appStore.displayMode === mode}
            >{mode}</button>
        {/each}
    </div>
<!--
NOTE: Svelte takes $userProfileStore and subscribes to the store (vis userProfileStore.subscribe()
Given this, the Svelte compiler types the `$` accessed stores as the TState type.
e.g.:
* without `$` the type is `userProfileStore.state.userName`
* with `$` the type is `$userProfileStore.userName`
-->
    {$userProfileStore.userName}
    <button
            class="wide"
            on:click={() => userProfileStore.dispatch({eventAction: 'update-mood', detail: {}})}
    >Status: {$userProfileStore.selectedMode}</button>
</div>