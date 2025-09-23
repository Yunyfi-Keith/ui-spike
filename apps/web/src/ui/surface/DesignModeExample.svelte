<script>
    import {connect} from '../../connect';
    import {surfaceDesignStore} from '../../stores/surface-design-store';

</script>
<div id="operation-mode-example">
    <div use:connect="{{ store: surfaceDesignStore, stateProp: 'state', actionsProp: 'actions' }}">
        {#each $surfaceDesignStore.components as component}
            <svelte:element this={component.tagName}/>
        {/each}
    </div>
</div>