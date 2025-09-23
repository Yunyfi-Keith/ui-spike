
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
    const details = e.detail as Partial<YuEventDetail<TDetail>> | undefined;
    const hasEventAction = typeof details.eventAction === 'string';
    const hasComponentId = typeof details.componentId === 'string';
    return hasEventAction && hasComponentId;
}
