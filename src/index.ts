import "zone.js";
//
const currentZone = Zone.current;
const childAZone = currentZone.fork({
  name: "childA",
  onInvoke(
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    delegate: Function,
    applyThis: any,
    applyARgs: any
  ): any {
    console.log("intercepted in childAZone before execution");

    parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyARgs);
    console.log("intercepted in childAZone after execution");
  },
});

const childBZone = childAZone.fork({
  name: "childB",
  onInvoke(
    parentZoneDelegate: ZoneDelegate,
    currentZone: Zone,
    targetZone: Zone,
    delegate: Function,
    applyThis: AnalyserNode,
    applyArgs: any
  ): any {
    console.log("Intercepted in childBZone before execution");
    parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs);
    console.log("Intercepted in childBZone after execution");
  },
});

const helloFunction = () => console.log("Hello");
childBZone.run(helloFunction);
