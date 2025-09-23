<script>
    import {connect} from '../../connect';
    import {surfaceDesignStore} from '../../stores/surface-design-store';

</script>
<div id="operation-mode-example">
    <div use:connect="{{ store: surfaceDesignStore, stateProp: 'state', actionsProp: 'actions' }}">
        {#each $surfaceDesignStore.components as component}
            <!-- ISSUE it seems the IDE, and compiler don't understand the component typings -->
            <!--
            This is currently just binding a flat list of components,
            The exising app has a recursive component tree and we could potentially that pattern here.
            Once we've proved the state flow, configuration and operation vs runtime patterns, then this can be enhanced to support parent child rendering.
            -->
            <yu-designer componentId={component.componentId}>
                <svelte:element this={component.tagName} configuration={component.configuration}/>
            </yu-designer>
        {/each}
    </div>
</div>