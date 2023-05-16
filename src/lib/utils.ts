//for merging class names and write conditional classes
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]){
    //merges Tailwind classes for optimization
    return twMerge(clsx(inputs))
}