
export interface YuEventDetail<TDetail> {
    eventAction: string;
    componentId: string;
    detail: TDetail;
}

export interface YuEvent<TDetail>{
    eventAction: string;
    createInstance: (componentId: string, details: TDetail, bubbles?: boolean, composed?: boolean) => CustomEvent<YuEventDetail<TDetail>>;
}

export const YuEventTypeChannel = 'yu-event-channel';

export const createYuEvent = <TDetail>(eventAction: string) => {
    return {
        eventAction: eventAction,
        createInstance: (componentId: string, detail?: TDetail, bubbles = true, composed = true) => {
            return new CustomEvent<YuEventDetail<TDetail>>(
                // All events go over a common channel, so we can route them to the correct handler.
                YuEventTypeChannel,
                {
                    bubbles: bubbles,
                    composed: composed,
                    detail: {
                        componentId: componentId,
                        eventAction: eventAction,
                        detail: detail
                    }
                }
            )
        }
    } as YuEvent<TDetail>;
}

export const isCustomEventOfYuEventDetail = <TDetail = any>(e: Event): e is CustomEvent<YuEventDetail<TDetail>> => {
    if (!(e instanceof CustomEvent)) return false;
    const details = e.detail as Partial<YuEventDetail<TDetail>>;
    return typeof details.eventAction === 'string' && typeof details.componentId === 'string';
}

export const isYuEvent = <TDetail = any>(e: any): e is YuEvent<TDetail> => {
    if (typeof e !== 'object') return false;
    if (e === null) return false;
    const yuEventPartial = e as Partial<YuEvent<TDetail>>;
    return typeof yuEventPartial.eventAction === 'string' && typeof yuEventPartial.createInstance === 'function';
}
