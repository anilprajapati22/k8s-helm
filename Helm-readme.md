### Helm Template Guide - Notes & Commands

#### Helm Overview
Helm is a Kubernetes package manager that helps you define, install, and upgrade complex Kubernetes applications. Helm charts are a collection of templates and configurations used to deploy these applications.

---

### Helm Commands Overview

1. **helm create `<chart-name>`**
   - **Description**: Creates a new Helm chart with the given name. It provides a boilerplate structure for charts.
   - **Example**: 
     ```bash
     helm create my-chart
     ```

2. **helm install `<release-name>` `<chart-name>`**
   - **Description**: Installs a chart into a Kubernetes cluster. The release name is the deployment reference for tracking.
   - **Example**:
     ```bash
     helm install my-release ./my-chart
     ```

3. **helm upgrade `<release-name>` `<chart-name>`**
   - **Description**: Upgrades an existing release with a new version of the chart or configuration.
   - **Example**:
     ```bash
     helm upgrade my-release ./my-chart
     ```

4. **helm template `<chart-name>`**
   - **Description**: Renders templates locally without installing them to a cluster.
   - **Example**:
     ```bash
     helm template my-chart
     ```

5. **helm lint `<chart-name>`**
   - **Description**: Checks the chart for issues or inconsistencies.
   - **Example**:
     ```bash
     helm lint my-chart
     ```

6. **helm repo add `<repo-name>` `<repo-url>`**
   - **Description**: Adds a Helm repository from where charts can be fetched.
   - **Example**:
     ```bash
     helm repo add stable https://charts.helm.sh/stable
     ```

7. **helm repo update**
   - **Description**: Updates the Helm repositories to the latest version.
   - **Example**:
     ```bash
     helm repo update
     ```

8. **helm pull `<chart-repo/chart-name>`**
   - **Description**: Downloads a chart from a Helm repository.
   - **Example**:
     ```bash
     helm pull stable/mysql
     ```

9. **helm list**
   - **Description**: Lists all Helm releases in the current Kubernetes context.
   - **Example**:
     ```bash
     helm list
     ```

10. **helm uninstall `<release-name>`**
    - **Description**: Uninstalls a release from the Kubernetes cluster.
    - **Example**:
      ```bash
      helm uninstall my-release
      ```

---

### Templating in Helm

Helm uses Go templates to allow for dynamic content in Kubernetes YAML manifests.

#### Variables
- **Defining Variables**: Variables are defined using `{{ .VariableName }}`.
  - Example:
    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: {{ .Values.appName }}
    ```

#### Functions
- **Functions**: Helm includes several built-in functions to manipulate data.
  - Example: Use the `quote` function to safely quote values.
    ```yaml
    metadata:
      labels:
        app: {{ quote .Values.appName }}
    ```

#### Loops (`range`)
- **Description**: Loops allow you to iterate over lists or maps in your templates.
  - Example:
    ```yaml
    env:
      {{- range .Values.env }}
      - name: "{{ .name }}"
        value: "{{ .value }}"
      {{- end }}
    ```

#### Conditional Logic (`if`, `else`, `else if`)
- **Description**: Helm templates support conditional logic to render different parts of YAML based on conditions.
  - Example:
    ```yaml
    {{- if .Values.enableFeature }}
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: feature-config
    {{- else }}
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: default-config
    {{- end }}
    ```

#### `with`
- **Description**: `with` is used to modify the scope, making it easier to access nested variables.
  - Example:
    ```yaml
    {{- with .Values.service }}
    ports:
      - name: http
        port: {{ .port }}
    {{- end }}
    ```

#### Pipelines (`|`)
- **Description**: Allows chaining of functions.
  - Example: Convert a string to lowercase.
    ```yaml
    kind: {{ .Values.kind | lower }}
    ```

---

### Using Values in Templates

Helm uses the `values.yaml` file to provide inputs for templates. These values can be referenced using `.Values`.

- Example `values.yaml`:
  ```yaml
  appName: my-app
  enableFeature: true
  service:
    port: 80
  ```

- Referencing values in a template:
  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: {{ .Values.appName }}
  spec:
    ports:
      - port: {{ .Values.service.port }}
  ```

---

### Built-in Objects in Helm

- **Release**: Information about the Helm release.
  - Example:
    ```yaml
    release: {{ .Release.Name }}
    ```

- **Values**: User-defined values from `values.yaml`.
  - Example:
    ```yaml
    appName: {{ .Values.appName }}
    ```

- **Chart**: Information about the chart (name, version).
  - Example:
    ```yaml
    chart: {{ .Chart.Name }}
    ```

- **Files**: Access non-templated files inside the chart.
  - Example:
    ```yaml
    data: {{ .Files.Get "config.json" }}
    ```

- **Capabilities**: Information about Kubernetes version and API capabilities.
  - Example:
    ```yaml
    apiVersion: {{ .Capabilities.KubeVersion.Version }}
    ```

---

### Helm Template Syntax Summary

- `{{ ... }}`: Used to inject variables and logic.
- `{{- ... }}`: Removes preceding whitespace.
- `{{ ... -}}`: Removes trailing whitespace.
- `{{- ... -}}`: Removes both preceding and trailing whitespace.

These are key commands, functions, and concepts from the [Helm documentation](https://helm.sh/docs/chart_template_guide/getting_started/). By understanding them, you can create powerful and flexible Helm charts for Kubernetes applications.