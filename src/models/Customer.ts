const customerSchema = new Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  loyaltyPoints: { type: Number, default: 0 },
});
export const Customer = model("Customer", customerSchema);
