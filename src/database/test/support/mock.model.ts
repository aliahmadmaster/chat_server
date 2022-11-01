export abstract class MockModel<TDocument> {
    protected abstract modelStub: TDocument;
  
    constructor(createAbstractData: TDocument) {
      this.constructorSpy(createAbstractData);
    }
  
    constructorSpy(_createAbstractData: TDocument): void {}
  
    findOne(): { exec: () => TDocument } {
      return {
        exec: (): TDocument => this.modelStub
      }
    }
  
    async find(): Promise<TDocument[]> {
      return [this.modelStub]
    }
  
    async save(): Promise<TDocument> {
      return this.modelStub;
    }
  
    async findOneAndUpdate(): Promise<TDocument> {
      return this.modelStub;
    }
  }