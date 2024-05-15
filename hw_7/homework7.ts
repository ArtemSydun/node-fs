interface IAnimal {
  id: string;
}

// Only getter
class Cat implements IAnimal {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }
}

// Only setter
class Mouse implements IAnimal {
  private _id: string;

  constructor() {
    this._id = "";
  }

  set id(value: string) {
    this._id = value;
  }
}

// Both getter and setter
class Horse implements IAnimal {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
