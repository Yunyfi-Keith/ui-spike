<script lang="ts">
    export let selectedName: string | null = null;
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
    label {
        font-size: 0.8rem;
        color: #555;
    }
    input, select {
        width: 100%;
        padding: 6px 8px;
        font-size: 0.9rem;
        border: 1px solid #d8dbe6;
        border-radius: 6px;
        background: #fff;
    }
</style>

<div class="panel">
    <div class="section">
        <div class="section-header">Selection</div>
        <div class="section-body">
            <div>
                <label>Selected element</label>
                <div>{selectedName ?? 'Nothing selected'}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-header">Layout</div>
        <div class="section-body">
            <div>
                <label>Width</label>
                <input type="text" placeholder="auto" />
            </div>
            <div>
                <label>Height</label>
                <input type="text" placeholder="auto" />
            </div>
            <div>
                <label>Padding</label>
                <input type="text" placeholder="16px" />
            </div>
        </div>
    </div>

</div>