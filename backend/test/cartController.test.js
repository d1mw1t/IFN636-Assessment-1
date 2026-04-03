const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const expect = chai.expect;

const CartItem = require("../models/CartItem"); //Mongo model
const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController");
//Import controller functions we are testing

describe("Grocerie R Us Cart Controller Tests", () => {
  afterEach(() => {
    sinon.restore();
  });
  //Resets stubs after each test so one test does not affect the next

  describe("addToCart", () => {
    it("should create a new Grain Waves item successfully", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Grain Waves - Sweet Chilli",
          category: "Snacks",
          price: 3.33,
          image:
            "https://cdn0.woolworths.media/content/wowproductimages/large/329430.jpg",
          quantity: 1,
        },
      };
      //Fake request from logged in user

      const savedItem = {
        _id: new mongoose.Types.ObjectId(),
        user: req.user._id,
        ...req.body,
      };
      //Pretend this is the item saved into mongo

      sinon.stub(CartItem, "findOne").resolves(null);
      //No matching item already in cart

      sinon.stub(CartItem.prototype, "save").resolves(savedItem);
      //Pretend save works and returns the saved item

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      //Fake response object

      await addToCart(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(savedItem)).to.be.true;
    });

    it("should create a new Chicken Schnitzel item successfully", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Chicken Schnitzel",
          category: "Meat",
          price: 6.54,
          image:
            "https://cdn0.woolworths.media/content/wowproductimages/large/134041.jpg",
          quantity: 1,
        },
      };

      const savedItem = {
        _id: new mongoose.Types.ObjectId(),
        user: req.user._id,
        ...req.body,
      };

      sinon.stub(CartItem, "findOne").resolves(null);
      sinon.stub(CartItem.prototype, "save").resolves(savedItem);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(savedItem)).to.be.true;
    });

    it("should create a new Quest Protein Cookie item successfully", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Quest Protein Cookie",
          category: "Protein Snacks",
          price: 2.22,
          image:
            "https://cdn.productimages.coles.com.au/productimages/3/3926679.jpg",
          quantity: 1,
        },
      };

      const savedItem = {
        _id: new mongoose.Types.ObjectId(),
        user: req.user._id,
        ...req.body,
      };

      sinon.stub(CartItem, "findOne").resolves(null);
      sinon.stub(CartItem.prototype, "save").resolves(savedItem);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(savedItem)).to.be.true;
    });

    it("should increase quantity if the grocery item already exists", async () => {
      const existingItem = {
        quantity: 1,
        save: sinon.stub().resolves({
          name: "Grain Waves - Sweet Chilli",
          quantity: 2,
        }),
      };
      //Pretend item already exists in this user's cart

      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Grain Waves - Sweet Chilli",
          category: "Snacks",
          price: 3.33,
          quantity: 1,
        },
      };

      sinon.stub(CartItem, "findOne").resolves(existingItem);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(existingItem.quantity).to.equal(2);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should add the provided quantity when item already exists", async () => {
      const existingItem = {
        quantity: 2,
        save: sinon.stub().resolves({
          name: "Chicken Schnitzel",
          quantity: 5,
        }),
      };
      //Starts at 2 and should go up by 3

      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Chicken Schnitzel",
          category: "Meat",
          price: 6.54,
          quantity: 3,
        },
      };

      sinon.stub(CartItem, "findOne").resolves(existingItem);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(existingItem.quantity).to.equal(5);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should default quantity to 1 when quantity is not provided", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Chicken Schnitzel",
          category: "Meat",
          price: 6.54,
          image:
            "https://cdn0.woolworths.media/content/wowproductimages/large/134041.jpg",
        },
      };
      //No quantity sent from frontend

      const saveStub = sinon.stub(CartItem.prototype, "save").resolves({
        _id: new mongoose.Types.ObjectId(),
        user: req.user._id,
        ...req.body,
        quantity: 1,
      });

      sinon.stub(CartItem, "findOne").resolves(null);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(saveStub.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should return 400 when name is missing", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          category: "Snacks",
          price: 3.33,
        },
      };
      //Missing required name field

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Missing required fields" })).to.be
        .true;
    });

    it("should return 400 when category is missing", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Quest Protein Cookie",
          price: 2.22,
        },
      };
      //Missing required category field

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Missing required fields" })).to.be
        .true;
    });

    it("should return 400 when price is missing", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Chicken Schnitzel",
          category: "Meat",
        },
      };
      //Missing required price field

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Missing required fields" })).to.be
        .true;
    });

    it("should return 500 when addToCart throws an error", async () => {
      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
        body: {
          name: "Milk",
          category: "Dairy",
          price: 4.5,
          quantity: 1,
        },
      };

      sinon.stub(CartItem, "findOne").throws(new Error("DB Error"));
      //Pretend mongo throws an error

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await addToCart(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe("getCartItems", () => {
    it("should return all cart items for the current user", async () => {
      const userId = new mongoose.Types.ObjectId();

      const items = [
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Grain Waves - Sweet Chilli",
          user: userId,
          quantity: 1,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Chicken Schnitzel",
          user: userId,
          quantity: 2,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Quest Protein Cookie",
          user: userId,
          quantity: 1,
        },
      ];
      //Fake cart items for this user

      const findStub = sinon.stub(CartItem, "find").resolves(items);

      const req = {
        user: { _id: userId },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await getCartItems(req, res);

      expect(findStub.calledOnceWith({ user: userId })).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(items)).to.be.true;
    });

    it("should return an empty array when the cart has no items", async () => {
      sinon.stub(CartItem, "find").resolves([]);
      //Pretend user has nothing in their cart

      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await getCartItems(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([])).to.be.true;
    });

    it("should return only one item when cart contains one grocery item", async () => {
      const userId = new mongoose.Types.ObjectId();

      const items = [
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Quest Protein Cookie",
          user: userId,
          quantity: 1,
        },
      ];
      //Single item result

      sinon.stub(CartItem, "find").resolves(items);

      const req = {
        user: { _id: userId },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await getCartItems(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(items)).to.be.true;
    });

    it("should return 500 when getCartItems throws an error", async () => {
      sinon.stub(CartItem, "find").throws(new Error("DB Error"));

      const req = {
        user: { _id: new mongoose.Types.ObjectId() },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await getCartItems(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe("updateCartItem", () => {
    it("should update cart item quantity successfully", async () => {
      const cartItem = {
        quantity: 1,
        save: sinon.stub().resolves({
          name: "Grain Waves - Sweet Chilli",
          quantity: 3,
        }),
      };
      //Found item in cart and save works

      sinon.stub(CartItem, "findOne").resolves(cartItem);

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
        body: { quantity: 3 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await updateCartItem(req, res);

      expect(cartItem.quantity).to.equal(3);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should update Chicken Schnitzel quantity to 5", async () => {
      const cartItem = {
        quantity: 2,
        save: sinon.stub().resolves({
          name: "Chicken Schnitzel",
          quantity: 5,
        }),
      };

      sinon.stub(CartItem, "findOne").resolves(cartItem);

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
        body: { quantity: 5 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await updateCartItem(req, res);

      expect(cartItem.quantity).to.equal(5);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should update Quest Protein Cookie quantity to 2", async () => {
      const cartItem = {
        quantity: 1,
        save: sinon.stub().resolves({
          name: "Quest Protein Cookie",
          quantity: 2,
        }),
      };

      sinon.stub(CartItem, "findOne").resolves(cartItem);

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
        body: { quantity: 2 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await updateCartItem(req, res);

      expect(cartItem.quantity).to.equal(2);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should return 400 if quantity is undefined", async () => {
      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
        body: {},
      };
      //No quantity sent from frontend

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await updateCartItem(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Quantity must be at least 1" })).to
        .be.true;
    });

    it("should return 400 if quantity is less than 1", async () => {
      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
        body: { quantity: 0 },
      };
      //Quantity cannot be 0 or negative

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await updateCartItem(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Quantity must be at least 1" })).to
        .be.true;
    });

    it("should return 404 if cart item is not found", async () => {
      sinon.stub(CartItem, "findOne").resolves(null);
      //Nothing found for this id and user

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
        body: { quantity: 2 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await updateCartItem(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Cart item not found" })).to.be
        .true;
    });

    it("should return 500 when updateCartItem throws an error", async () => {
      sinon.stub(CartItem, "findOne").throws(new Error("DB Error"));

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
        body: { quantity: 2 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await updateCartItem(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe("deleteCartItem", () => {
    it("should delete a cart item successfully", async () => {
      const cartItem = {
        deleteOne: sinon.stub().resolves(),
      };
      //Pretend delete works

      sinon.stub(CartItem, "findOne").resolves(cartItem);

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await deleteCartItem(req, res);

      expect(cartItem.deleteOne.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Cart item deleted successfully" }))
        .to.be.true;
    });

    it("should delete Quest Protein Cookie successfully", async () => {
      const cartItem = {
        deleteOne: sinon.stub().resolves(),
      };

      sinon.stub(CartItem, "findOne").resolves(cartItem);

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await deleteCartItem(req, res);

      expect(cartItem.deleteOne.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should delete Chicken Schnitzel successfully", async () => {
      const cartItem = {
        deleteOne: sinon.stub().resolves(),
      };

      sinon.stub(CartItem, "findOne").resolves(cartItem);

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await deleteCartItem(req, res);

      expect(cartItem.deleteOne.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });

    it("should return 404 if cart item is not found", async () => {
      sinon.stub(CartItem, "findOne").resolves(null);

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await deleteCartItem(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Cart item not found" })).to.be
        .true;
    });

    it("should return 500 when deleteCartItem throws an error", async () => {
      sinon.stub(CartItem, "findOne").throws(new Error("DB Error"));

      const req = {
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await deleteCartItem(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
});
