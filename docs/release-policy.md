# DAPO MCP Server – Release & Versioning Policy

This document defines the versioning, release stages, and compatibility
guarantees for the DAPO MCP Server. The goal is to provide a stable,
predictable evolution path for integrators, implementers, and tool builders.

---

## 1. Versioning Model (SemVer)

The DAPO MCP Server follows **Semantic Versioning (SemVer)**:


### MAJOR  
Breaking changes in:
- MCP capabilities  
- response formats  
- metadata schemas (providers, steps, scoring, baseline)  
- protocol-level behavior  
- removal of previously defined fields  

### MINOR  
Backward-compatible feature additions:
- new capabilities  
- new optional fields  
- new metadata categories  
- new MCP operations  

### PATCH  
Bug fixes and internal improvements with **no protocol changes**.

---

## 2. Release Stages

### v0.x – Pre-Standardization Phase  
The API is functional but **not yet stable**.  
Breaking changes may occur at any time.

### v1.0.0 – Official Standard Baseline  
The first version with:
- stable handshake schema  
- stable DAPO metadata model  
- stable provider/step/scoring/baseline interfaces  
- guaranteed backward compatibility for all 1.x releases  

### v1.x – Standard-Compatible Development  
New capabilities may be added, but **no breaking changes**.

### v2.0.0 and beyond  
Introduced only when:
- protocol changes are required  
- new architecture pillars must be added  
- core metadata definitions evolve  

---

## 3. Compatibility Guarantees

### Within the same MAJOR version:
- All responses remain backward compatible.
- No required fields are removed.
- MCP clients should continue to operate without modification.

### Across MAJOR upgrades:
- Breaking changes are allowed.
- Migration notes must be published.
- Deprecation periods must be communicated.

---

## 4. Deprecation Policy

Any field, operation, or capability marked for removal must:
1. Be announced in at least **one MINOR** version prior to removal.  
2. Be documented in the release notes and the MIGRATION guide.  
3. Remain functional until the next MAJOR release.

---

## 5. Tagging and Releasing

Each release must include:
- a Git tag (`vX.Y.Z`)
- a GitHub Release page
- release notes containing:
  - added / changed / removed items
  - breaking changes (if any)
  - migration instructions (if needed)

---

## 6. Version Independence from the DAPO Methodology

The DAPO MCP Server version is **independent** from the DAPO Specification version.

- The methodology may evolve as a standalone document.
- The MCP Server only exposes the **machine-readable interface**.
- MCP version numbers reflect protocol stability, not conceptual evolution.

---

## 7. Long-Term Vision

The release policy enables:
- interoperable implementations  
- third-party MCP clients  
- ecosystem expansion (validators, analyzers, dashboards)  
- clean evolution of the DAPO standard  

The DAPO MCP Server aims to become a **stable reference implementation**
for machine-readable reasoning metadata.

---
