<script>
    import {connect} from '../../connect';
    import {surfaceOperationStore} from '../../stores/surface-operation-store';
</script>
<div id="operation-mode-example">
    <yu-page title="Contact Us" use:connect="{{ store: surfaceOperationStore, stateProp: 'state', actionsProp: 'actions' }}">
        <div slot="children">
            <yu-container>
                <div slot="children">
                    <yu-text-input label="First Name"></yu-text-input>
                    <yu-text-input label="Last Name"></yu-text-input>
                    <yu-counter state={surfaceOperationStore.state.counterState}></yu-counter>
                    <br/>
                    <yu-button text="Submit"></yu-button>
                </div>
            </yu-container>
            <yu-expander headerText="Disclaimer">
                <div slot="children">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </yu-expander>
        </div>
    </yu-page>
</div>