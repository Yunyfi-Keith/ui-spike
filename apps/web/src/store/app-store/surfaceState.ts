import {SurfaceDisplayMode} from './surfaceDisplayMode';

export interface SurfaceState {
    displayMode: SurfaceDisplayMode;
    designModeState: DesignModeState;
    operationModeState: OperationModeState;
}

export interface DesignModeState {
    counterState: { count: number, label: string };
}

export interface OperationModeState {
    counterState: { count: number, label: string };
}


export const createDefaultSurfaceState: () => SurfaceState = () => {
    return {
        displayMode: SurfaceDisplayMode.Design,
        designModeState: {
            counterState: {
                count: 2,
                label: 'Counter Label - Design Mode'
            },
        },
        operationModeState: {
            counterState: {
                count: 2,
                label: 'Counter Label - Operation Mode'
            },
        },
    }
};