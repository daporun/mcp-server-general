// src/mcp/ListRegistry.ts

export interface MCPListItem {
  name: string;
  [key: string]: unknown;
}

export interface MCPList {
  id: string;
  title?: string;
  items: MCPListItem[];
}

class ListRegistry {
  private lists = new Map<string, MCPList>();

  register(list: MCPList): void {
    this.lists.set(list.id, list);
  }

  get(id: string): MCPList | undefined {
    return this.lists.get(id);
  }

  list(): MCPList[] {
    return Array.from(this.lists.values());
  }

  clear(): void {
    this.lists.clear();
  }
}

export const listRegistry = new ListRegistry();
