<script lang="ts">
    import { componentsMetadata } from '../../web-components/componentReference';
    import {surfaceDesignStore, YuAddComponentEvent} from '../../stores/surface-design-store/surfaceDesignStore';
</script>

<style>
    .toolbox {
        padding: 12px;
        display: grid;
        gap: 12px;
    }
    .group {
        border: 1px solid #e8eaf2;
        border-radius: 8px;
        background: #fff;
    }
    .group-header {
        padding: 10px 12px;
        border-bottom: 1px solid #eef0f6;
        font-weight: 600;
        font-size: 0.9rem;
    }
    .group-body {
        padding: 10px 12px;
        display: grid;
        gap: 8px;
    }
    .tool {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border: 1px dashed #d6d9e6;
        border-radius: 6px;
        background: #fbfcff;
        cursor: grab;
        user-select: none;
    }
    .tool:active {
        cursor: grabbing;
    }
    .tag {
        margin-left: auto;
        color: #7a8195;
        font-size: 0.75rem;
        background: #f0f2f9;
        padding: 2px 6px;
        border-radius: 4px;
    }
</style>

<div class="toolbox">
    <div class="group">
        <div class="group-header">Basic</div>
        <div class="group-body">
            {#each componentsMetadata as metadata}
                <div
                        class="tool"
                        draggable="true"
                        title={`Drag to surface to add a ${metadata.className}`}
                        on:dragend={() => surfaceDesignStore.dispatch(YuAddComponentEvent.create({componentClassName: metadata.className, tagName: metadata.tagName}))}
                >
                    <span>{metadata.className}</span>
                    <span class="tag">&lt;{metadata.tagName} /&gt;</span>
                </div>
            {/each}
        </div>
    </div>
</div>