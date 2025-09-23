export interface YuEventInstance<TData> {
    eventAction: string;
    componentId?: string; // not sure if we actually need this
    data?: TData;
}

export interface YuEvent<TData> {
    eventAction: string;
    create: (data?: TData, componentId?: string) => YuEventInstance<TData>;
    createAsCustomEvent: (data?: TData, componentId?: string, bubbles?: boolean, composed?: boolean) => CustomEvent<YuEventInstance<TData>>;
}

export const YuCustomEventChannel = 'yu-custom-event-channel';

export const createYuEvent = <TData>(eventAction: string) => {
    return {
        eventAction: eventAction,
        create: (data?: TData, componentId?: string) => {
            return <YuEventInstance<TData>>
                {
                    eventAction: eventAction,
                    data,
                    componentId,
                };
        },
        createAsCustomEvent: (data?: TData, componentId?: string, bubbles = true, composed = true) => {
            return new CustomEvent<YuEventInstance<TData>>(
                // All CustomEvent<TData> go over a common channel, so we can route them to the correct handler via other code.
                YuCustomEventChannel,
                {
                    bubbles: bubbles,
                    composed: composed,
                    detail: {
                        eventAction: eventAction,
                        data,
                        componentId,
                    }
                }
            );
        }
    } as YuEvent<TData>;
}

export const isCustomEventOfYuEventDetail = <TDetail = any>(e: Event): e is CustomEvent<YuEventInstance<TDetail>> => {
    if (!(e instanceof CustomEvent)) return false;
    const details = e.detail as Partial<YuEventInstance<TDetail>>;
    return typeof details.eventAction === 'string';
}

export const isYuEvent = <TDetail = any>(e: any): e is YuEvent<TDetail> => {
    if (typeof e !== 'object') return false;
    if (e === null) return false;
    const yuEventPartial = e as Partial<YuEvent<TDetail>>;
    return typeof yuEventPartial.eventAction === 'string' && typeof yuEventPartial.createAsCustomEvent === 'function' && typeof yuEventPartial.create === 'function';
}
