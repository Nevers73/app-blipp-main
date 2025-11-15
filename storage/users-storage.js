import { Utilisateur } from "@/types";

class UsersStorage {
  private users: Map<string, Utilisateur> = new Map();
  private emailToId: Map<string, string> = new Map();

  constructor() {
    const adminUser: Utilisateur = {
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

  getById(id: string): Utilisateur | undefined {
    return this.users.get(id);
  }

  getByEmail(email: string): Utilisateur | undefined {
    const id = this.emailToId.get(email);
    return id ? this.users.get(id) : undefined;
  }

  create(user: Utilisateur): Utilisateur {
    if (this.emailToId.has(user.email)) {
      throw new Error("Email already exists");
    }
    this.users.set(user.id, user);
    this.emailToId.set(user.email, user.id);
    console.log(`User created: ${user.email}`);
    return user;
  }

  update(id: string, updates: Partial<Utilisateur>): Utilisateur {
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

  delete(id: string): void {
    const user = this.users.get(id);
    if (user) {
      this.emailToId.delete(user.email);
      this.users.delete(id);
      console.log(`User deleted: ${id}`);
    }
  }

  addFavori(userId: string, couleurId: string): Utilisateur {
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

  removeFavori(userId: string, couleurId: string): Utilisateur {
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
