export abstract class Constructable {

    constructor(objectToMap?: any){
      this.mapFrom(objectToMap);
    }
  
    private mapFrom(objectToMap: any): void {
      if (objectToMap) {
        Object.assign(this, objectToMap);
      }
    }
  }
  