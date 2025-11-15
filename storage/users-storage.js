class UsersStorage {
  constructor() {
    this.users = new Map();
    this.emailToId = new Map();

    // Crée un admin par défaut
    const adminUser = {
      id: "admin-1",
      nom: "Admin",
      email: "admin@blipp.com",
      telephone: "",
      role: "admin",
      favoris: [],
    };

    this.users.set(adminUser.id, adminUser);
    this.emailToId.set(adminUser.email, adminUser.id);
  }

  getById(id) {
    return this.users.get(id);
  }

  getByEmail(email) {
    const id = this.emailToId.get(email);
    return id ? this.users.get(id) : undefined;
  }

  create(user) {
    if (this.emailToId.has(user.email)) {
      throw new Error("Email already exists");
    }
    this.users.set(user.id, user);
    this.emailToId.set(user.email, user.id);
    console.log(`User created: ${user.email}`);
    return user;
  }

  update(id, updates) {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = { ...user, ...updates, id };

    if (updates.email && updates.email !== user.email) {
      this.emailToId.delete(user.email);
      this.emailToId.set(updates.email, id);
    }

    this.users.set(id, updatedUser);
    console.log(`User updated: ${id}`);
    return updatedUser;
  }

  delete(id) {
    const user = this.users.get(id);
    if (user) {
      this.emailToId.delete(user.email);
      this.users.delete(id);
      console.log(`User deleted: ${id}`);
    }
  }

  addFavori(userId, couleurId) {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.favoris.includes(couleurId)) {
      user.favoris.push(couleurId);
      console.log(`Added favori ${couleurId} for user ${userId}`);
    }

    return user;
  }

  removeFavori(userId, couleurId) {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.favoris = user.favoris.filter((id) => id !== couleurId);
    console.log(`Removed favori ${couleurId} for user ${userId}`);
    return user;
  }
}

export const usersStorage = new UsersStorage();
