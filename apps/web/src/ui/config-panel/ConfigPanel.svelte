<script lang="ts">
    import {
        ComponentConfigUpdated,
        surfaceDesignStore,
        surfaceOperationStore,
        appStore,
        userProfileStore
    } from '../../stores';

    // ISSUE some circular references or packaging issues means I can't import this type as expected
    type HACK_ComponentDesignConfig = any;

    let componentConfigInput: HTMLTextAreaElement; // reference to the textarea

    const onSaveComponentState = () => {
        let componentConfiguration: HACK_ComponentDesignConfig = JSON.parse(componentConfigInput.value);
        surfaceDesignStore.dispatch(ComponentConfigUpdated.create(componentConfiguration));
    };

    // Store dropdown data
    type StoreOption = { name: string; ref: unknown };
    const storeOptions: StoreOption[] = [
        { name: 'surfaceDesignStore', ref: surfaceDesignStore },
        { name: 'surfaceOperationStore', ref: surfaceOperationStore },
        { name: 'appStore', ref: appStore },
        { name: 'userProfileStore', ref: userProfileStore },
    ];
    let selectedStoreName: string = storeOptions[0].name;

</script>

<style>
    .panel {
        padding: 12px;
    }

    .section {
        margin-bottom: 16px;
        border-radius: 8px;
        border: 1px solid #e8eaf2;
        background: #fff;
    }

    .section-header {
        padding: 10px 12px;
        border-bottom: 1px solid #eef0f6;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .section-body {
        padding: 10px 12px;
        display: grid;
        gap: 8px;
    }

    select {
        width: 100%;
        padding: 6px 8px;
        font-size: 0.9rem;
        border: 1px solid #d8dbe6;
        border-radius: 6px;
        background: #fff;
    }

    textarea {
        field-sizing: content;
        overflow-y: hidden;
        min-height: 4rem;
    }
</style>

<div class="panel">
    <div class="section">
        <div class="section-header">Selected Component Config</div>
        <div class="section-body">
            <div>
                {#if $surfaceDesignStore.selectedComponent}
                    <textarea bind:this={componentConfigInput}>{JSON.stringify($surfaceDesignStore.selectedComponent, null, 2)}</textarea>
                    <button on:click={() => onSaveComponentState()}>Save</button>
                {:else}
                    <div>None</div>
                {/if}
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">Store</div>

        <div class="section-body">
            <select bind:value={selectedStoreName} aria-label="Select store">
                {#each storeOptions as option}
                    <option value={option.name}>{option.name}</option>
                {/each}
            </select>
        </div>

    </div>

</div>