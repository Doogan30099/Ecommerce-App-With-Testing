import { useState } from "react";
import { useCategories } from "../hooks/UseCategories";



interface Props {
    onSelectCategory: (category: string) => void; 
}


export default function CategorySelector({ onSelectCategory }: Props) {
    const {data: categories, isLoading } = useCategories();
    const [selected, setSelected] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelected(value);
        onSelectCategory(value);
    };

    return (
        <div className="mb-4">
            <label className="form-label fw-semibold">Filter by Category:</label>
            <select 
                className="form-select"
                value={selected}
                onChange={handleChange}
                disabled={isLoading}
            >
                <option value="">All Products</option>
                {categories?.map((c) => (
                    <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}