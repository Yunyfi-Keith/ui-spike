# Whiteboarding discussion

White board notes:

# Store granularity

This will be 'less' is better:

* 1 store for the app
* 1 store for surface design mode
* 1 store for page runtime

**the above looks OK for the spike**

# Store model

This needs to be fleshed out.

Design Time Store
- componentLookup (MAP)
    - input1
    - container1
    - input2
    - container2
- layout (Parent Child)
    - container1
        - input1
        - container2
            - input2

Runtime Time Store
- probably the same as above initially

App Store
- surface state
- header state
- user profile state

**the above looks OK for the spike**

## Where does config live?

If we have `<yu-foo />`, and it has config for how it works at runtime, where does that config live?

Initially I was going for a wrapper component holds the config, then at runtime that config plus the wc is created dymically. 

It was suggested that that config object should live on the component as 
1) design time: we need to update the values.
    * If the config is updated in design time, we'll 'usually' have to update the target property. 
      For example, if the label is changed, we'll need to update the label property on the input. 
2) runtime: the internals of the componet may need to refer to this for 'static data' type operations.

Example: 

```
export class YuTextInput extends LitElement {
    @property({attribute: true})
    accessor label: string = null;

    @property({attribute: true})
    accessor value: string = null;

    @property({attribute: true})
    accessor config: {label_Name: string, value_default: string}
```

**For now let's model the config as a property on the component**

# 2 Connecting to the store

* Wrapper component: `<yu-store-connector />`
* Binding function: `use:bindStoreToHtmlElement="{{ store: appStore, stateProp: 'state', actionsProp: 'actions' }}"`

The granularity of the binding could be at a higher point, or it could be at each web components level.

* Each 'component' Binds to the store
    * This is a bit of a moot point, at the end of the day if 1 component needs to bind, then any can bound.

**Let's try a binding function as we ideally don't want something in the DOM.**

# Getting events to the store (Whiteboard point 1)

* Bubbling - with CustomEvent<>
* Action - inject actions as you inject state, then call those actions
* Lit context - basically the same as bubbling but less standard.

**For now let's stick with bubbling.** 

# Mutating the store

* what is the mutation contract: 
  * handler mutates store and returns new store:
    * `myHandler(currentStore, eventData) => newStore`
  * User immer and just mutate the entire store (**probably this**):
    * `myHandler(Currentstore, eventData) => void`
  * No mutation, do as above but without immer

Where do handlers live?

You need handlers tied to the shape of the store, or at least the shape of the component state. 
These could all live under the store on the `app` side of the code base.
These need to be bound to specific events and the store

```
const storeConfig = Store.create()
    .on(YuEvent.SomethingClicked, (currentStore) => { /* do mutations */} [, currentStore => currentStore])
    .on(YuEvent.SomethingClicked, (subPart) => { /* do mutations */}, currentStore=> currentStore.SubPart)

... create the store so ultimately the above events can be bound up. 

yu-connectore -> store manager -> process events -> mutate -> dispatch updates -> to root node | to each component
    
```

**Let's put in some basic functionality in the store to**
1) dispatch events to actions based on confif
2) use immer to mutate the store
3) put the handlers near the store code

# Propagating Updates

Once the store has changed, how do we propagate the changes down the DOM?

1) top-down push (the React model)
   * parent push props - would need to use svelte so the props get set correctly.
2) mutiple nodes subscribe - granularity likely at the web component level
   * nodes select their own piece of state
   * it would use the same connector binding as options 1, just at many more levels. 