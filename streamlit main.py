
import streamlit as st
import requests

st.set_page_config(page_title="Medcare Prescription Analyzer", layout="centered")
st.title("Medcare Prescription Analyzer")

st.markdown("""
Upload a prescription image or enter drug details manually. Get instant analysis: drug interactions, dosage checks, alternatives, and recommendations.
""")

st.header("Patient Information")
col1, col2 = st.columns(2)
with col1:
    patient_name = st.text_input("Patient Name", "Demo User")
    age = st.number_input("Age", min_value=0, max_value=120, value=30)
with col2:
    weight = st.number_input("Weight (kg)", min_value=0, max_value=200, value=70)

st.header("Prescription Input")
upload_mode = st.radio("Choose input method:", ["Upload Image", "Manual Entry"])

drugs = []
ocr_text = ""
analysis_result = None

if upload_mode == "Upload Image":
    uploaded_file = st.file_uploader("Upload prescription image (JPG/PNG)", type=["jpg", "jpeg", "png"])
    if uploaded_file is not None:
        st.image(uploaded_file, caption="Uploaded Prescription", use_column_width=True)
        if st.button("Analyze Prescription Image"):
            with st.spinner("Analyzing image and extracting drugs..."):
                files = {"file": (uploaded_file.name, uploaded_file, uploaded_file.type)}
                try:
                    response = requests.post("http://localhost:8000/ocr", files=files)
                    if response.status_code == 200:
                        data = response.json()
                        ocr_text = data.get("text", "")
                        drugs = data.get("drugs", [])
                        analysis_result = {
                            "interactions": data.get("interactions", []),
                            "alternatives": data.get("alternatives", []),
                            "recommendations": data.get("recommendations", [])
                        }
                    else:
                        st.error(f"API error: {response.text}")
                except Exception as e:
                    st.error(f"Failed to connect to backend: {e}")
        if ocr_text:
            st.subheader("Extracted Prescription Text")
            st.code(ocr_text)
elif upload_mode == "Manual Entry":
    st.write("Enter drug details below:")
    drug_count = st.number_input("Number of drugs", min_value=1, max_value=10, value=1)
    for i in range(drug_count):
        col1, col2, col3 = st.columns(3)
        with col1:
            name = st.text_input(f"Drug {i+1} Name", key=f"name_{i}")
        with col2:
            dosage = st.text_input(f"Drug {i+1} Dosage", key=f"dosage_{i}")
        with col3:
            frequency = st.text_input(f"Drug {i+1} Frequency", key=f"freq_{i}")
        drugs.append({"name": name, "dosage": dosage, "frequency": frequency, "route": "oral"})

    if st.button("Analyze Manual Prescription"):
        with st.spinner("Analyzing entered drugs..."):
            # Simulate backend call (replace with actual API if available)
            try:
                # You can POST to a /analyze endpoint if implemented
                # For now, just show entered drugs
                analysis_result = {
                    "interactions": [],
                    "alternatives": [],
                    "recommendations": ["Manual analysis not connected to backend."]
                }
            except Exception as e:
                st.error(f"Failed to analyze: {e}")

if drugs:
    st.subheader("Extracted/Entered Drugs")
    for idx, drug in enumerate(drugs):
        st.write(f"{idx+1}. **{drug['name']}** — {drug['dosage']} — {drug['frequency']}")

if analysis_result:
    st.header("Analysis Results")
    if analysis_result["interactions"]:
        st.subheader("Drug Interactions")
        for inter in analysis_result["interactions"]:
            st.error(f"{inter['drug1']} + {inter['drug2']}: {inter['description']} (Severity: {inter['severity']})")
            st.info(f"Recommendation: {inter['recommendation']}")
    else:
        st.success("No harmful drug interactions detected.")

    if analysis_result["alternatives"]:
        st.subheader("Safer Alternatives")
        for alt in analysis_result["alternatives"]:
            st.warning(f"Replace {alt['originalDrug']} with {alt['alternative']} — {alt['reason']}")
            if alt.get("dosageAdjustment"):
                st.info(f"Dosage Guidance: {alt['dosageAdjustment']}")

    if analysis_result["recommendations"]:
        st.subheader("Clinical Recommendations")
        for rec in analysis_result["recommendations"]:
            st.write(f"- {rec}")