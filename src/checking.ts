import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(18).max(99).required(),
});
async function checkver(check: any) {
  const { error, value } = await schema.validateAsync(check);

  //   if (error) {
  //     // Dane nie spełniają warunków walidacji
  //     console.log("Błąd walidacji:", error.details[0].message);
  //   } else {
  //     // Dane spełniają warunki walidacji
  //     console.log("Przetworzone dane:", value);
  //   }assad
}
const value = {
  name: "M12ic2u",
  dateOfBirth: 1966,
  phonenumber: 2324212312,
  email: "m1swefa2sd@cz11d.com",
  password: "pieskii3333kotki",
};

checkver(value);
